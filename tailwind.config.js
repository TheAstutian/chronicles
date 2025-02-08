/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'selector',
    content: [
      "./src/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
      extend: {
        colors:{
            'background':'#f9f4ef',
            'text':'#020826',
            'button':'#8c7851',
            'button-text':'#fffffe',
            'secondary':'#eaddcf', 
            'tertiary':'#f25042',
            'btncol':'#fffffe',
            'tip':'#f582ae', 
            'tip2':'#8bd3dd',
            'tip3':'#994ff3',
            'tip4':'#fbdd74',
            'tip5':'#d9376e'
        }
      },
    },
    plugins: [
      
    ],
  }
  
  