import React from 'react';
import logo from '../../Assets/Di-logo.png'
const Header = () => {
  return (
    // <nav className="w-full  h-20 ">
    //   <div className="container flex h-full relative justify-between items-center mx-auto px-8">
    //     {/* Logo */}
    //   <div className="inline-flex w-32">
    //     <img
    //     height={40} 
    //     src={logo} alt="Logo" />
    //   </div>

    //   {/* Barre de recherche */}
    //   <div className="hidden sm:block flex-shrink flex-grow-0 justify-start px-2">
    //   <div class="inline-block">
    //         <div class="inline-flex items-center max-w-full">
    //             <button class="flex items-center flex-grow-0 flex-shrink pl-2 relative w-60 border rounded-full px-1  py-1" type="button">
    //                 <div class="block flex-grow flex-shrink overflow-hidden">Start your search</div>
    //                 <div class="flex items-center justify-center relative  h-8 w-8 rounded-full">
    //                     <svg block h-10 w-10
    //                         viewBox="0 0 32 32"
    //                         xmlns="http://www.w3.org/2000/svg"
    //                         aria-hidden="true"
    //                         role="presentation"
    //                         focusable="false"
    //                         // style="
    //                         //     display: block;
    //                         //     fill: none;
    //                         //     height: 12px;
    //                         //     width: 12px;
    //                         //     stroke: currentcolor;
    //                         //     stroke-width: 5.33333;
    //                         //     overflow: visible;
    //                         // "
    //                     >
    //                         <g fill="none">
    //                             <path
    //                                 d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"
    //                             ></path>
    //                         </g>
    //                     </svg>
    //                 </div>
    //             </button>
    //         </div>
    //     </div>
    //   </div>

    //   {/* Pagination */}
    //   <div className="flex items-center flex-grow-0">
    //     <ul className="flex space-x-4">
    //       <li>
    //         <a href="#" className="text-gray-500 hover:text-gray-700">
    //           All Address
    //         </a>
    //       </li>
    //       <li>
    //         <a href="#" className="text-gray-500 hover:text-gray-700">
    //             All custumers
    //         </a>
    //       </li>
    //       <li>
    //         <a href="#" className="text-blue-600 font-semibold">
    //           Alls products
    //         </a>
    //       </li>
    //       {/* Ajoutez d'autres pages ici si nécessaire */}
    //     </ul>
    //   </div>

    //   {/* Connexion */}
    //   <div className="flex-initial">
    //     {/* Vos éléments de connexion ici */}
    //   </div>
    //   </div>
    // </nav>
    <header class="pb-6 bg-white lg:pb-0">
    <div class="mx-auto max-w-7xl sm:px-6 lg:px-8 pt-4 ">
       
        <nav class="flex items-center justify-between h-16 lg:h-20">
            <div class="flex-shrink-0">
                <a href="#" title="" class="flex no-underline" >
                <img className="w-3/5" height={40} src={logo} alt="Logo" />  </a>
            </div>

            <button type="button" class="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100">
            
                <svg class="block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
                </svg>

             
                <svg class="hidden w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <div class="hidden lg:flex lg:items-center lg:ml-auto lg:space-x-10">
                <a href="#" title="" class="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600 no-underline"> Features </a>

                <a href="#" title="" class="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600 no-underline"> Solutions </a>

                <a href="#" title="" class="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600 no-underline"> Resources </a>

                <a href="#" title="" class="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600 no-underline"> Pricing </a>
            </div>

            <a href="#" title="" class="items-center justify-center hidden px-4 py-3 ml-10 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md lg:inline-flex hover:bg-blue-700 focus:bg-blue-700 no-underline" role="button"> Get started now </a>
        </nav>

       
        <nav class="pt-4 pb-6 bg-white border border-gray-200 rounded-md shadow-md lg:hidden">
            <div class="flow-root">
                <div class="flex flex-col px-6 -my-2 space-y-1">
                    <a href="#" title="" class="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Features </a>

                    <a href="#" title="" class="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Solutions </a>

                    <a href="#" title="" class="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Resources </a>

                    <a href="#" title="" class="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Pricing </a>
                </div>
            </div>

            <div class="px-6 mt-6">
                <a href="#" title="" class="inline-flex justify-center px-4 py-3 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md tems-center hover:bg-blue-700 focus:bg-blue-700" role="button"> Get started now </a>
            </div>
        </nav>
    </div>
</header>

  );
};

export default Header;
