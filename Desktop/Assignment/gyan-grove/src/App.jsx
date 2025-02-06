import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import ItemForm from './components/ItemForm';
import InventoryTable from './components/InventoryTable';
import Footer from './components/Footer';

function App() {
   const [inventory, setInventory] = useState([
      { id: 1, name: "Laptop", category: "Electronics", quantity: 15 },
      { id: 2, name: "Keyboard", category: "Accessories", quantity: 8 },
    ]);
  return (
    <>
      <div id='app'>
        <Header />
        <ItemForm setInventory={setInventory}  />
        <InventoryTable inventory={inventory} setInventory={setInventory}/>
        <Footer/>
      </div>
    </>
  );
}

export default App;
