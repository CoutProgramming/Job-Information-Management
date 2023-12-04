import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// HOC kiểm tra xác thực đăng nhập
const WithAuth = (WrappedComponent) => {
  const WrappedWithAuth = (props) => {
    const navigate = useNavigate();
    
    // Kiểm tra trạng thái đăng nhập, bạn có thể thay đổi cách kiểm tra tùy theo cách bạn lưu trạng thái đăng nhập
    const isLoggedIn = localStorage.getItem('token'); // Ví dụ sử dụng localStorage

    useEffect(() => {
      // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
      if (!isLoggedIn) {
        toast.warning('You need to log in to view this page!');
        navigate('/login');
      }
    }, [isLoggedIn, navigate]);

    // Nếu đã đăng nhập, cho phép truy cập trang mới
    return isLoggedIn ? <WrappedComponent {...props} /> : null;
  };

  return WrappedWithAuth;
};

export default WithAuth;
