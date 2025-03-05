import { useRouter } from "next/router";



function ajouterUtilisateur() {
    const router = useRouter();

    const addUser = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newUser = {
            username: formData.get("username"),
            password: formData.get("password")
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/addUser.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });
            router.push("/admin_pages/modifierUtilisateur");

        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

  return (
    <div className='m-52'>
        <form onSubmit={addUser} className="mt-6 space-y-4">
    <input 
        type="text" 
        name="username" 
        placeholder="Username" 
        className="w-full p-2 border rounded-lg"
        required
    />
    <input 
        type="password" 
        name="password" 
        placeholder="Password" 
        className="w-full p-2 border rounded-lg"
        required
    />
    <button 
        type="submit" 
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
    >
        Add User
    </button>
</form>
</div>
  )
}

export default ajouterUtilisateur