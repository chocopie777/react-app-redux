import logo from './logo.svg';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {addCustomerAction, removeCustomersAction} from "./store/customReducer";
import {fetchCustomers} from "./asyncActions/customer";

function App() {
    const dispatch = useDispatch();
    const cash = useSelector(state => state.cash.cash);
    const customers = useSelector(state => state.customers.customers);
    console.log(cash);

    const addCash = (cash) => {
        dispatch({type: 'ADD_CASH', payload: cash})
    }

    const getCash = (cash) => {
        dispatch({type: 'GET_CASH', payload: cash})
    }

    const addCustomer = (name) => {
        const customer = {
            name,
            id: Date.now(),
        }
        dispatch(addCustomerAction(customer));
    }

    const removeCustomer = (customer) => {
        dispatch(removeCustomersAction(customer.id));
    }

    return (
        <div className="App">
            <div className='text-5xl absolute left-0 right-0 top-[40%] translate-y-[-40%]'>
                Баланс: {cash}
            </div>
            <div className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]'>
                <button
                    className='bg-blue-500 text-2xl rounded focus:outline-none px-2 py-2 hover:bg-blue-400 text-white'
                    onClick={() => addCash(Number(prompt()))}
                >Пополнить
                    счет
                </button>
                <button
                    className=' bg-green-500 text-2xl ml-[10px] rounded focus:outline-none px-2 py-2 hover:bg-green-400 text-white'
                    onClick={() => getCash(Number(prompt()))}
                >Снять
                    со счета
                </button>
                <button
                    className='bg-blue-500 text-2xl rounded focus:outline-none px-2 py-2 hover:bg-blue-400 text-white ml-[10px]'
                    onClick={() => addCustomer(prompt())}
                >Добавить клиента
                </button>
                <button
                    className=' bg-red-500 text-2xl ml-[10px] rounded focus:outline-none px-2 py-2 hover:bg-red-400 text-white'
                    onClick={() => dispatch(fetchCustomers())}
                >Получить клиентов
                </button>
            </div>
            <div className='absolute left-0 right-0 top-[80%] translate-y-[-80%] text-4xl'>
                {
                    customers.length > 0 ?
                        <div className='inline-flex flex-col '>
                            {customers.map(customer =>
                                <div onClick={() => removeCustomer(customer)} className='border border-black inline-block mb-2 px-3 py-3'>
                                    {customer.name}
                                </div>
                            )}
                        </div>
                        :
                        <div>
                            Клиентов нет
                        </div>
                }
            </div>
        </div>
    );
}

export default App;
