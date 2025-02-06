import { useEffect } from "react";

export default function InventoryTable({ inventory,setInventory }) {
    const handleClick = (e) => {
        setInventory(inventory.filter((item)=>item.id!==e))
    };
    
    inventory.sort((a, b) => a.quantity - b.quantity)

    useEffect(()=>{
        inventory.sort((a, b) => a.quantity - b.quantity)
    },[inventory])
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Quantity</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {inventory.map((item) => (
          <tr key={item.id} style={{backgroundColor: item.quantity < 10 ? "#ffcccc" : "transparent"}}>
            <td>{item.name}</td>
            <td>{item.category}</td>
            <td>{item.quantity}</td>
            <td><button id="delete" onClick={()=>handleClick(item.id)}>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}