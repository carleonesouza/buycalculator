"use client"
import { useEffect, useState } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddProduct: (product: Product) => void;
    onEditProduct?: (product: Product) => void; // Optional prop for editing
    onDeleteProduct?: (productId: number) => void; // Optional prop for deletion
    editProduct?: Product; // Product being edited, if any
  }
  


const Modal = ({
    isOpen,
    onClose,
    onAddProduct,
    onEditProduct,
    onDeleteProduct,
    editProduct
  }: ModalProps) => {
    // Assuming `isBrowser` setup is to handle SSR issues
    const [isBrowser, setIsBrowser] = useState<boolean>(false);
    const [newProduct, setNewProduct] = useState<Product>({ name: '', price: 0, category: '', quantity: 0 });
    const [price, setPrice] = useState('');
    
    useEffect(() => {
        setIsBrowser(true);
    }, []);


    const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
     
        // Allow only digits and a single decimal point to be input.
        const isValidInput = value.match(/^\d*\.?\d{0,2}$/);
        if (isValidInput) {            
          setPrice(value);
          handleChange(e);
        }
      };

      const handleBlur = () => {
        // Format the input to two decimal places on blur, if necessary.
       
        let value = parseFloat(price).toFixed(2);
       
        if (!isNaN(parseFloat(value))) {          
          setPrice(value);
        }
      };
  
  
    // Prepopulate the modal with editProduct data if available
    useEffect(() => {
      setIsBrowser(true);
      if (editProduct) {
        setNewProduct(editProduct);
        setPrice(editProduct.price.toString()); // Assuming price is a number
      }
    }, [editProduct]);
  
    // Simplified for brevity: Combine handleChangePrice into handleChange
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = e.target;
      if (name === 'price') {
        const isValidInput = value.match(/^\d*\.?\d{0,2}$/);
        if (isValidInput) {
          setPrice(value);
          setNewProduct((prev) => ({ ...prev, price: parseFloat(value) }));
        }
      } else {
        setNewProduct((prev) => ({ ...prev, [name]: value }));
      }
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      console.log(e);
      // Decide whether to add or edit based on presence of editProduct
      if (editProduct && onEditProduct) {
        onEditProduct(newProduct);
      } else {
        console.log(newProduct);
        onAddProduct(newProduct);
      }
      onClose(); // Close modal after operation
    };
  
    // Assume modalContent structure remains the same, with adjustments for new logic
  
    if (!isBrowser) {
      return null;
    }
  
    const modalContent = isOpen ? (
        <div tabIndex={-1} aria-hidden="true" className="flex overflow-y-auto 
        overflow-x-hidden absolute top-0 right-0 left-0 z-50 justify-center 
        items-center w-full md:inset-0 h-modal md:h-full">
            <div className="relative p-4 w-1/2 h-full md:h-auto">
                <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5  border-2 border-gray-500">

                    <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Add Product
                        </h3>
                        <button type="button" onClick={onClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="updateProductModal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 mb-4 sm:grid-cols-2">
                            <div className="w-full">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <input type="text" name="name" value={newProduct.name} onChange={handleChange} id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 
                                text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block
                                 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                                  dark:placeholder-gray-400 dark:text-white 
                                  dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Ex. Apple iMac 27&ldquo;" />
                            </div>

                            <div>
                                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                <input type="text" name="price" 
                                value={price}
                                onChange={handleChangePrice}
                                onBlur={handleBlur}
                                placeholder="0.00"id="price"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                                 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                  dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                     />
                            </div>

                            <div>
                                <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                                <input type="number" name="quantity" value={newProduct.quantity} onChange={handleChange} id="quantity"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                                 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                  dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="99" />
                            </div>
                            <div className="w-full">
                                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Category
                                </label>
                                <select
                                    name="category" // Ensure this matches the state property name
                                    id="category"
                                    value={newProduct.category} // Controlled component pattern
                                    onChange={handleChange} // Re-use your existing handleChange
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                >
                                    <option value="">Select Category</option> {/* Added for better UX */}
                                    <option value="Electronics">Electronics</option>
                                    <option value="TV">TV/Monitors</option>
                                    <option value="PC">PC</option>
                                    <option value="GA">Gaming/Console</option>
                                    <option value="PH">Phones</option>
                                </select>
                            </div>


                        </div>
                        <div className="flex items-center space-x-4 justify-end">
                            <button type="submit" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                Save product
                            </button>
                            <button type="button" className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                                <svg className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                Delete
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    ) : null;

    if (isBrowser) {
        return (

            modalContent


        );
    } else {
        return null;
    }
  };

  
export default Modal;