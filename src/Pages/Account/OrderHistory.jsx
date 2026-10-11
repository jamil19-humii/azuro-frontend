import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../AuthContext";


const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
   const location = useLocation();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/orders/myorders", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoadingOrders(false);
      }
    };
    fetchOrders();
  }, [user]);

  if (loadingOrders) return <p className="accountEmptyState">Loading orders...</p>;

  if (orders.length === 0) {
    return (
      <>
        <p className="accountEmptyState">You haven't placed any orders yet.</p>
        <Link to="/shop" className="accountLink">Start shopping →</Link>
      </>
    );
  }
 
  
  return (
  <div>
    {location.state?.orderPlaced && (
      <div className="orderSuccessBanner">
        ✅ Your order was placed successfully! Order #{location.state.orderId.slice(-6)}
      </div>
    )}

    <div className="orderList">
       {orders.map((order) => (
        <div key={order._id} className="orderItem">
          <div className="orderItemHeader">
            <span className="orderId">#{order._id.slice(-6)}</span>
            <span className={`orderStatus orderStatus-${order.status.toLowerCase()}`}>
              {order.status}
            </span>
          </div>
          <p className="orderMeta">{new Date(order.createdAt).toLocaleDateString()}</p>
          <div className="orderProductsList">
            {order.orderItems.map((item, index) => (
              <div key={index} className="orderProductRow">
                <img src={item.image} alt={item.name} className="orderProductImage" />
                <span className="orderProductName">
                  {item.name} × {item.quantity}
                </span>
              </div>
            ))}
          </div>
          <p className="orderTotal">${order.totalPrice.toFixed(2)}</p>
        </div>
      ))}
    </div>
    </div>
 
);

};

export default OrderHistory;