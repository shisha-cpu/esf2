import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import fs from 'fs';
import './Admin.css'
function Admin() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [file, setFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const [jsonText, setJsonText] = useState('');  // State to hold the JSON string for display

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

      // Преобразуем таблицу в массив объектов
      const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      let result = {};
      let currentCategory = '';

      rawData.forEach((row) => {
        if (row[0] && !row[1] && !row[2]) {
          // Если строка содержит заголовок категории (и не имеет других данных в строке)
          currentCategory = row[0].trim();
          result[currentCategory] = [];
        } else if (currentCategory && row[0] && row[1]) {
          // Если строка содержит данные продукта
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

      // Сохраняем данные в состояние
      setJsonData(result);
      setJsonText(JSON.stringify(result, null, 2));  // Set the JSON text for display

      // Check if the file exists and delete it before writing new data
      const filePath = 'public/data.json';
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);  // Delete the old file
        console.log('Old data.json file deleted');
      }

      // Сохраняем данные в новый файл
      fs.writeFileSync(filePath, JSON.stringify(result, null, 2), 'utf8');
      console.log('Data has been written to data.json');
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
