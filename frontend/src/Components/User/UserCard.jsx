

function UserCard(props) {
    return (

        <div className="flex items-center justify-center">

            <div className="max-w-xs">
                <div className="bg-white shadow-xl rounded-lg py-3">
                    <img className="w-32 h-32 rounded-full mx-auto" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&s" alt="John Doe"/>
                    <div className="p-2">
                        <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{props.name}</h3>
                        <div className="text-center text-gray-400 text-xs font-semibold">
                            <p>Property Owner</p>
                        </div>
                        <table className="text-xl my-3">
                            <tbody>
                            <tr>
                                <td className="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                                <td className="px-2 py-2">+977 9955221114</td>
                            </tr>
                            <tr>
                                <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
                                <td className="px-2 py-2">{props.email}</td>
                            </tr>
                            </tbody></table>

                    </div>
                </div>
            </div>

        </div>
    );
}

export default UserCard;