import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function AppLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
