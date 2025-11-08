from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from google.cloud import firestore
from google.oauth2 import service_account
from datetime import datetime
import os

app = Flask(__name__, static_folder='static', static_url_path='')
CORS(app)

cred_path = os.getenv('GOOGLE_APPLICATION_CREDENTIALS', 'serviceAccountKey.json')

if os.path.exists(cred_path):
    credentials = service_account.Credentials.from_service_account_file(cred_path)
    db = firestore.Client(project='joseph-suvak-resume', credentials=credentials)
else:
    print(f"Warning: {cred_path} not found, using application default credentials")
    db = firestore.Client(project='joseph-suvak-resume')

@app.route('/')
def serve_react_app():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

def firestore_to_dict(doc):
    data = doc.to_dict()
    if data:
        data['id'] = doc.id
        for key, value in data.items():
            if isinstance(value, datetime):
                data[key] = value.isoformat()
            elif hasattr(value, 'timestamp'):
                try:
                    data[key] = value.to_datetime().isoformat() if hasattr(value, 'to_datetime') else str(value)
                except:
                    data[key] = str(value)
    return data

@app.route('/api/resume', methods=['GET'])
def get_resume():
    try:
        doc = db.collection('resume').document('data').get()
        if doc.exists:
            return jsonify(doc.to_dict())
        return jsonify({'error': 'Resume not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/resume/personal', methods=['GET'])
def get_personal_info():
    try:
        doc = db.collection('resume').document('data').get()
        if doc.exists:
            data = doc.to_dict()
            personal_info = {
                'name': data.get('name'),
                'title': data.get('title'),
                'email': data.get('email'),
                'phone': data.get('phone'),
                'location': data.get('location'),
                'linkedIn': data.get('linkedIn'),
                'gitHub': data.get('gitHub'),
                'calendly': data.get('calendly')
            }
            return jsonify(personal_info)
        return jsonify({'error': 'Personal info not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/resume/skills', methods=['GET'])
def get_skills():
    try:
        doc = db.collection('resume').document('data').get()
        if doc.exists:
            data = doc.to_dict()
            return jsonify(data.get('skills', []))
        return jsonify({'error': 'Skills not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/resume/experience', methods=['GET'])
def get_experience():
    try:
        doc = db.collection('resume').document('data').get()
        if doc.exists:
            data = doc.to_dict()
            return jsonify(data.get('experience', []))
        return jsonify({'error': 'Experience not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/resume/education', methods=['GET'])
def get_education():
    try:
        doc = db.collection('resume').document('data').get()
        if doc.exists:
            data = doc.to_dict()
            return jsonify(data.get('education', []))
        return jsonify({'error': 'Education not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/resume/projects', methods=['GET'])
def get_projects():
    try:
        doc = db.collection('resume').document('data').get()
        if doc.exists:
            data = doc.to_dict()
            return jsonify(data.get('projects', []))
        return jsonify({'error': 'Projects not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def get_relationship_priority(relationship):
    priorities = {
        'manager': 1,
        'direct-report': 2,
        'colleague': 3,
        'client': 4,
        'mentor': 5
    }
    return priorities.get(relationship.lower() if relationship else '', 6)

@app.route('/api/references/approved', methods=['GET'])
def get_approved_references():
    try:
        refs = db.collection('references').where('approved', '==', True).stream()
        references = [firestore_to_dict(ref) for ref in refs]
        
        def sort_key(ref):
            priority = get_relationship_priority(ref.get('relationship'))
            created_at = ref.get('createdAt', '')
            timestamp_value = created_at if isinstance(created_at, str) else ''
            return (priority, timestamp_value)
        
        references.sort(key=sort_key, reverse=True)
        
        return jsonify(references)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/references', methods=['GET', 'POST'])
def references():
    if request.method == 'GET':
        try:
            refs = db.collection('references').stream()
            references = [firestore_to_dict(ref) for ref in refs]
            references.sort(key=lambda x: x.get('createdAt', ''), reverse=True)
            return jsonify(references)
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    elif request.method == 'POST':
        try:
            data = request.json
            data['approved'] = False
            data['createdAt'] = firestore.SERVER_TIMESTAMP
            
            doc_ref = db.collection('references').add(data)
            return jsonify({
                'id': doc_ref[1].id,
                'message': 'Reference submitted successfully'
            }), 201
        except Exception as e:
            return jsonify({'error': str(e)}), 500

@app.route('/api/references/<reference_id>/approve', methods=['PATCH'])
def approve_reference(reference_id):
    try:
        db.collection('references').document(reference_id).update({'approved': True})
        return jsonify({'message': 'Reference approved successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/references/<reference_id>/reject', methods=['PATCH'])
def reject_reference(reference_id):
    try:
        db.collection('references').document(reference_id).update({'approved': False})
        return jsonify({'message': 'Reference rejected successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/references/<reference_id>', methods=['DELETE'])
def delete_reference(reference_id):
    try:
        db.collection('references').document(reference_id).delete()
        return jsonify({'message': 'Reference deleted successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/service-requests', methods=['POST'])
def submit_service_request():
    try:
        data = request.json
        data['createdAt'] = firestore.SERVER_TIMESTAMP
        
        doc_ref = db.collection('serviceRequests').add(data)
        return jsonify({
            'id': doc_ref[1].id,
            'message': 'Service request submitted successfully'
        }), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5065, debug=True)
