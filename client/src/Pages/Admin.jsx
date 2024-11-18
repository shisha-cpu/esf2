import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import fs from 'fs';
import './Admin.css'
function Admin() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [file, setFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const [jsonText, setJsonText] = useState('');  

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    if (password === '1') {
      setIsAuthenticated(true);
    } else {
      alert('Неверный пароль');
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      processExcelFile(file);
    }
  };

  const processExcelFile = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const data = new Uint8Array(reader.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
  
      const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      let result = {};
      let currentCategory = '';
  
      rawData.forEach((row) => {
        if (row[0] && !row[1] && !row[2]) {
          currentCategory = row[0].trim();
          result[currentCategory] = [];
        } else if (currentCategory && row[0] && row[1]) {
          const product = {
            photo: row[0] || '',
            manufacturer: row[1] || '',
            weight: row[2] || '',
            seatWidth: row[3] || '',
            description: row[4] || '',
            price: row[5] || 0,
            name: row[6] || '',
            code: row[7] || '',
            loadCapacity: row[8] || '',
          };
          result[currentCategory].push(product);
        }
      });
  
      setJsonData(result);
      setJsonText(JSON.stringify(result, null, 2));
  

      fetch('http://90.156.169.196:4444/update-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(result),
      })
        .then((response) => response.json())
        .then((data) => console.log('Data saved on server:', data))
        .catch((error) => console.error('Error saving data:', error));
    };
    reader.readAsArrayBuffer(file);
  };
  

  const handleDownload = () => {
    if (jsonData) {
      const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'data.json';
      link.click();
    } else {
      alert('Нет данных для скачивания');
    }
  };

  return (
    <div className='adminPanel'>
      {!isAuthenticated ? (
        <div className='admin-content'>
          <div className="title">
            <h1>Введите пароль для доступа</h1>
          </div>
          <input 
            type="password" 
            value={password} 
            onChange={handlePasswordChange} 
            placeholder="Введите пароль" 
          />
          <button onClick={handleLogin}>Войти</button>
        </div>
      ) : (
        <div>
          <div className="title">
            <h1>Загрузка файла Excel</h1>
          </div>
          <input type="file" onChange={handleFileChange} />
          {jsonData && (
            <div>
              <button onClick={handleDownload}>Скачать data.json</button>
              <pre>{jsonText}</pre>  
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Admin;
