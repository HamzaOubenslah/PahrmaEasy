import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPharmacyReviews, deleteReview } from '../../store/pharmacyThunk';
import { Table, Button, Space, Rate, Popconfirm, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const Reviews = () => {
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector((state) => state.pharmacy);

  useEffect(() => {
    dispatch(fetchPharmacyReviews());
  }, [dispatch]);

  const handleDelete = async (reviewId) => {
    try {
      await dispatch(deleteReview(reviewId)).unwrap();
      message.success('Review deleted successfully');
    } catch (err) {
      message.error(err.message || 'Failed to delete review');
    }
  };

  const columns = [
    {
      title: 'CUSTOMER',
      dataIndex: 'customer',
      key: 'customer',
      render: (customer) => customer?.name || 'Anonymous',
    },
    {
      title: 'REVIEW',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: 'RATING',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => (
        <Rate 
          character="★" 
          value={rating} 
          count={6} 
          disabled 
          style={{ color: '#1890ff' }} 
        />
      ),
    },
    {
      title: 'DATE',
      dataIndex: 'createdAt',
      key: 'date',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'ACTIONS',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Are you sure to delete this review?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button 
              type="text" 
              danger 
              icon={<DeleteOutlined />} 
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="reviews-container">
      <h1 className="text-3xl font-bold text-[#100] mt-8">Reviews & Feedback</h1>
     
      <h2 className="mt-4 mb-6">Customer Reviews</h2>
      
      <Table
        columns={columns}
        dataSource={reviews}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default Reviews;