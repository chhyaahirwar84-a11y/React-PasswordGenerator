import { useEffect, useRef, useState } from 'react'
import { useCallback } from 'react'

function App() {
  const [Length, setLength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)
  const [Passward, setPassward] = useState("")
  const PasswardRef =useRef(null)
  const PasswardGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*(){}[]~_-`"

    for (let i = 1; i <= Length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassward(pass)
  },

    [Length, numberAllowed, charAllowed, setPassward])
  const copyPasswardtoClipboard = useCallback(()=>{
    PasswardRef.current?.select()
    PasswardRef.current?.setSelectionRange(0, 99)
    window.navigator.clipboard.writeText(Passward)
  })
     useEffect(() => {
      PasswardGenerator()
     },
  [Length, numberAllowed, charAllowed])
  return (
    <>

      <div className='w-full max-w-2xl mx-auto shadow-md
     rounded-lg px-4 py-4 my-6  text-white bg-gray-800 text-center'>Passsword Generator
        <div className='flex shadow-emerald-50 rounded-lg overflow-hidden mb-4 my-6'>
          <input
            type='text'
            value={Passward}
            className=
            'outline-none text-white w-full py-2 px-3 bg-gray-600 ' 
            placeholder=
            'Password' readOnly 
            ref={PasswardRef}/>

          <button
          onClick={copyPasswardtoClipboard}
            className='outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0 hover:bg-blue-300 '>
            Copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type='range'
              min={6}
              max={100}
              value={Length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label>Length: {Length}</label>
          </div>
          <div className='flex items-center gap-2'>
            <input type='checkbox'
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={
                () => {
                  setnumberAllowed((prev) => !prev);
                }}

            />Numbers
          </div>
          <div className='flex items-center gap-2'>
            <input type='checkbox'
              defaultChecked={charAllowed}
              id='characterInput'
              onChange={
                () => {
                  setcharAllowed((prev) => !prev);
                }}

            />Characters
          </div>
        </div>
      </div>
    </>
  )
}

export default App