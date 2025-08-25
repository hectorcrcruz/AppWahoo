import { useNavigate } from "react-router-dom";
import { Button } from "../core";


export const NotFoundPage = () => {
 
  const navigate = useNavigate()

  const handleNavigate = () => {
    localStorage.removeItem("auth-store"); 
     localStorage.removeItem("auth-store"); // o el nombre de la key donde guardas el rolId/token
    localStorage.removeItem("auth");
      navigate("/login");
      window.location.reload(); // Recargar la página para asegurarte de que el estado se actualiza
  } 





  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mt-4">Página no encontrada</h2>
      <p className="text-gray-600 mt-2">La página que buscas no existe o ha sido movida.</p>
      <Button type='button' onClick={() => handleNavigate()} className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
        Volver al inicio
      </Button>
    </div>
  );
}


