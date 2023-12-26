const Button = (name) => {
    return(
    <div className="inline-flex justify-center px-4 py-3 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md tems-center hover:bg-blue-700 focus:bg-blue-700">
        {name}
    </div>
    );
}

export default Button;