import React from 'react';
import { useSubscription } from '@apollo/client';
import { gql } from '@apollo/client';
import { OrderStatusSubscriptionProps } from './types';

const ORDER_STATUS_CHANGED = gql`
  subscription OrderStatusChanged($userId: ID!) {
    orderStatusChanged(userId: $userId) {
      orderId
      status
    }
  }
`;

const OrderStatusSubscription: React.FC<OrderStatusSubscriptionProps> = ({ userId }) => {
  const { data, loading } = useSubscription(ORDER_STATUS_CHANGED, {
    variables: { userId },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (data) {
    const { orderId, status } = data.orderStatusChanged;
    return (
      <div>
        Order ID: {orderId}, Status: {status}
      </div>
    );
  }

  return null;
};

export default OrderStatusSubscription;
