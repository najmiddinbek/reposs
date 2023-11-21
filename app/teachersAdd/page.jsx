import Teachers from "../../components/Teachers";
import Navbar from "../../components/Navbar";



const PupilsAddPage = () => {
    return (
        <>
            <div>
                <Navbar />
                <div className='container bg-gray-100 w-full mx-auto flex justify-center items-center h-[85vh]'>
                    <Teachers />
                </div>
            </div>

        </>
    );
};

export default PupilsAddPage;