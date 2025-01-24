import { useState } from "react"

export default function ItemForm({setInventory}){
    const [newItem, setNewItem] = useState({
        name:"",
        category:"",
        quantity:""
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newItem.name || !newItem.category || !newItem.quantity) return;
        setInventory((prev) => [...prev, { ...newItem, id: Date.now(), quantity: Number(newItem.quantity) }]);
        // setInventory((prev) => prev.sort((a, b) => a.quantity - b.quantity));
        setNewItem({ name: "", category: "", quantity:  "" });
    };

    return(
        <form onSubmit={handleSubmit}  >
            <input type="text"
            placeholder="Name" 
            value={newItem.name}
            onChange={(e)=>{
                setNewItem({ ...newItem, name: e.target.value })
            }} />
            <input type="text" 
            placeholder="Category" 
            value={newItem.category}
            onChange={(e)=>{
                setNewItem({...newItem, category:e.target.value})
            }} />
            <input type="number" 
            placeholder="Quantity" 
            value={newItem.quantity}    
            onChange={(e)=>{
                setNewItem({...newItem, quantity:e.target.value})
            }} />
            <button type="submit">Add</button>
        </form>
    )
}