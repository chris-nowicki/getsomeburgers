export const ButtonPrimary = ({type, size, label, width, onClickProp, margin, padding, errorProps, name}) => {
    let buttonStyle

    switch (size) {
        case 'xs':
            buttonStyle = `inline-flex items-center justify-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:text-slate-500 disabled:bg-slate-50 disabled:border-slate-20 ${width} ${margin} ${padding}`
            break
        case 'sm':
            buttonStyle = `inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:text-slate-500 disabled:bg-slate-50 disabled:border-slate-20 ${width} ${margin} ${padding}`
            break
        case 'md':
            buttonStyle = `inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:text-slate-500 disabled:bg-slate-50 disabled:border-slate-20 ${width} ${margin} ${padding}`
            break        
        case 'lg':
            buttonStyle = `inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:text-slate-500 disabled:bg-slate-50 disabled:border-slate-20 ${width} ${margin} ${padding}`
            break        
        case 'xl':
            buttonStyle =`inline-flex items-center justify-center px-6 py-3 border border-transparent text-base text-2xl rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:text-slate-500 disabled:bg-slate-50 disabled:border-slate-20 ${width} ${margin} ${padding}`
            break
        default:
            break
    }

    // let valCheck = false

    // if (name.length < 3) {
    //     valCheck = true;
    // } else if (type.length < 3) {
    //     valCheck = true
    // } else if ()
 

    return (


        // errorProps && (name.length < 3 ) ?
        //     <button
        //         type={type}
        //         className={buttonStyle}
        //         onClick={onClickProp}
        //         disabled>
        //     {label}
        //     </button> : 
            <button
                type={type}
                className={buttonStyle}
                onClick={onClickProp}
      >
      {
        label === 'Add Pet' ?
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
        </svg> :
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
</svg>

      }
{label}</button>
    )
}

export const ButtonSecondary = ({type, size, label, width, onClickProp, margin}) => {
    let buttonStyle

    switch (size) {
        case 'xs':
            buttonStyle = `inline-flex items-center justify-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${width} ${margin}`
            break
        case 'sm':
            buttonStyle = `inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${width} ${margin}`
            break
        case 'md':
            buttonStyle = `inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${width} ${margin}`
            break        
        case 'lg':
            buttonStyle = `inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${width} ${margin}`
            break        
        case 'xl':
            buttonStyle =`inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${width} ${margin}`
            break
        default:
            break
    
    }

    return (
        <button
        type={type}
        className={buttonStyle}
        onClick={onClickProp}
      >{label}</button>
    )
}

export const ButtonDanger = ({type, size, label, width, onClickProp, margin}) => {
    let buttonStyle

    switch (size) {
        case 'xs':
            buttonStyle = `inline-flex items-center justify-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${width} ${margin}`
            break
        case 'sm':
            buttonStyle = `inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${width} ${margin}`
            break
        case 'md':
            buttonStyle = `inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${width} ${margin}`
            break        
        case 'lg':
            buttonStyle = `inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${width} ${margin}`
            break        
        case 'xl':
            buttonStyle =`inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${width} ${margin}`
            break
        default:
            break

    }

    return (
        <button
        type={type}
        className={buttonStyle}
        onClick={onClickProp}
      >{label}</button>
    )
}

export const ButtonCustom = ({type, size, label, width, onClickProp, margin, padding, color}) => {
    let buttonStyle

    switch (size) {
        case 'xs':
            buttonStyle = `inline-flex items-center justify-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${width} ${margin}`
            break
        case 'sm':
            buttonStyle = `inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${width} ${margin}`
            break
        case 'md':
            buttonStyle = `inline-flex items-center justify-center px-4 py-2 border border-black text-sm font-medium rounded-md shadow-sm text-black  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${width} ${margin} ${padding}`
            break        
        case 'lg':
            buttonStyle = `inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-black  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${width} ${margin}`
            break        
        case 'xl':
            buttonStyle =`inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${width} ${margin}`
            break
        default:
            break
    }

    return (
        <button
        type={type}
        className={buttonStyle}
        onClick={onClickProp}
      >{label}</button>
    )
}
