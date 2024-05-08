import sqlite3
import json

def create_database():
    conn = sqlite3.connect('data.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS data (
            id INTEGER PRIMARY KEY,
            end_year TEXT,
            intensity INTEGER,
            sector TEXT,
            topic TEXT,
            insight TEXT,
            url TEXT,
            region TEXT,
            start_year TEXT,
            impact TEXT,
            added TEXT,
            published TEXT,
            country TEXT,
            relevance INTEGER,
            pestle TEXT,
            source TEXT,
            title TEXT,
            likelihood INTEGER
        )
    ''')
    conn.commit()
    conn.close()

def insert_data(data):
    conn = sqlite3.connect('data.db')
    #conn = get_db_connection()
    cursor = conn.cursor()
    for item in data:
        cursor.execute('''
            INSERT INTO data (
                end_year, intensity, sector, topic, insight, url,
                region, start_year, impact, added, published,
                country, relevance, pestle, source, title, likelihood
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            item.get('end_year', ''),
            item.get('intensity', None),
            item.get('sector', ''),
            item.get('topic', ''),
            item.get('insight', ''),
            item.get('url', ''),
            item.get('region', ''),
            item.get('start_year', ''),
            item.get('impact', ''),
            item.get('added', ''),
            item.get('published', ''),
            item.get('country', ''),
            item.get('relevance', None),
            item.get('pestle', ''),
            item.get('source', ''),
            item.get('title', ''),
            item.get('likelihood', None)
        ))
    conn.commit()
    conn.close()

if __name__ == '__main__':
    create_database()
    # Read JSON data from file with specified encoding
    with open('jsondata.json', 'r', encoding='utf-8') as file:
        json_data = json.load(file)

    #Read JSON data from file
    #with open('jsondata.json', 'r') as file:
        #json_data = json.load(file)
    
    # Insert data into the database
    insert_data(json_data)

