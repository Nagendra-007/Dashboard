from flask import Flask, render_template, jsonify
import sqlite3

app = Flask(__name__)

# Function to establish database connection
def get_db_connection():
    conn = sqlite3.connect('data.db')
    conn.row_factory = sqlite3.Row
    return conn


@app.route('/api/data', methods=['GET'])
def get_data():
    #print('hello')
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM data')
    rows = cursor.fetchall()
    conn.close()

    # Convert SQLite Row objects to dictionaries
    data = [dict(row) for row in rows]

    # Print the fetched data
    #print("Fetched data:", data)

    return jsonify(data)
 

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
