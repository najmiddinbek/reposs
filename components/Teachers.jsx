'use client'


import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";
import ITLOGO from "../public/Logo_IT_Park_Uzbekistan.svg.png"

const PupilsAddClient = () => {

    const [teacherFIO, setteacherFIO] = useState("")
    const [teacherPassword, setteacherPassword] = useState("")
    const [teacherClass, setTeacherClass] = useState("")

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/teachers`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    teacherFIO,
                    teacherPassword,
                    teacherClass
                }),
            });

            if (res.ok) {
                const form = e.target;
                form.reset();
                router.push("/teachersAdd");
                toast.success("O`qituvchi sinfi hamda ism familiyasi qo`shildi", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                const response = await fetch("/api/topics");
                if (response.ok) {
                    const data = await response.json();
                    setTopicCount(data.length);
                } else {
                    console.log("Failed to fetch topic data.");
                }
            } else {
                console.log("User registration failed.");
            }
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <>
            <form onSubmit={handleSubmit} className="w-full flex flex-col h-[85vh] gap-3 main_form_add">
                <div className="text-end">
                    <Link className="green rounded-md py-3 px-10 text-white button" href={"/"}>Orqaga</Link>
                </div>



                <input
                    className="w-full py-3 px-2 border outline-none"
                    onChange={(e) => setteacherFIO(e.target.value)}
                    value={teacherFIO}
                    type="text"
                    placeholder="O`qituvchi FIO"
                />
                <input
                    className="w-full py-3 px-2 border outline-none"
                    onChange={(e) => setteacherPassword(e.target.value)}
                    value={teacherPassword}
                    type="text"
                    placeholder="O`qituvchi uchun parol"
                />
                <input
                    className="w-full py-3 px-2 border outline-none"
                    onChange={(e) => setTeacherClass(e.target.value)}
                    value={teacherClass}
                    type="text"
                    placeholder="O`qituvchining sinfi"
                />
                <button className="green text-white rounded-md cursor-pointer py-3 w-full">Qoshish</button>
                <div className='flex gap-1 pb-5 justify-center items-center'>
                    <h1 className='text-center text-[16px] poppins'>Web Sayt Chortoq IT Park jamoasi tomonidan tuzildi</h1>
                    <Image src={ITLOGO} alt='Image' width={50} height={10} />
                </div>





            </form >
        </>
    );
};

export default PupilsAddClient;