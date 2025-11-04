import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserRole } from '@/hooks/useUserRole';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
import BooksManagement from '@/components/admin/BooksManagement';
import OrdersManagement from '@/components/admin/OrdersManagement';
import UsersManagement from '@/components/admin/UsersManagement';

export default function AdminDashboard() {
  const { isAdmin, loading: roleLoading } = useUserRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (!roleLoading && !isAdmin) {
      navigate('/');
    }
  }, [isAdmin, roleLoading, navigate]);

  if (roleLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      <Tabs defaultValue="books" className="space-y-6">
        <TabsList>
          <TabsTrigger value="books">Books</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="books">
          <BooksManagement />
        </TabsContent>

        <TabsContent value="orders">
          <OrdersManagement />
        </TabsContent>

        <TabsContent value="users">
          <UsersManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}
