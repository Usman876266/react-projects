import React, { useState, useCallback, useEffect, useRef } from 'react';

const PasswordGenerator = () => {
  const [slider, setSlider] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [speccharr, setSpeccharr] = useState(false);
  const [password, setPassword] = useState('');
  const passwordRefer =  useRef(null);

  const PasswordGene = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numbers) str += '0123456789';
    if (speccharr) str += '~!@#$%^&*()_+';
    for (let i = 1; i <= slider; i++) {
      const chr = Math.floor(Math.random() * str.length);
      pass += str.charAt(chr);
    }
    setPassword(pass);
  }, [slider, numbers, speccharr]);
const copytoclipbord = useCallback(()=>{
    passwordRefer.current?.select();
    window.navigator.clipboard.writeText(password)
},[password])

  useEffect(() => {
    PasswordGene();
  }, [slider, numbers, speccharr, PasswordGene]);

  return (
    <div>
      <div>
        <h1>Password Generator</h1>
        <div style={{ width: '500px', height: '400px' }}>
          <input
            type="text"
            readOnly
            value={password}
            placeholder="password"
            style={{ height: '30px', width: '250px' }}
          /><br />
          <button onClick={copytoclipbord}>Copy</button>
          <input
            type="range"
            onChange={(e) => { setSlider(e.target.value) }}
            value={slider}
            style={{ marginTop: '50px' }}
          /> {slider}<br /><br />
          <div>
            <input
              type="checkbox"
              defaultChecked={numbers}
              onChange={() => { setNumbers((prev) => !prev) }}
            />
            <label htmlFor="add numbers">Add numbers</label>
            <input
              type="checkbox"
              defaultChecked={speccharr}
              onChange={() => { setSpeccharr((prev) => !prev) }}
            />
            <label htmlFor="add numbers">Special characters</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PasswordGenerator;
