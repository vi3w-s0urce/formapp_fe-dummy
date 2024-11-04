import React, { useEffect, useState } from "react";
import Sidebar from "../components/layouts/Sidebar";
import Card from "../components/Card";
import { useNavigate } from "react-router";
import { axiosAuth } from "../api/axiosConfig";
import Loading from "../components/Loading";
import { useAuth } from "../context/AuthContext";
import { Helmet } from "react-helmet";
import { Icon } from "@iconify/react";

const Home = (props) => {
    const { token, user } = props;

    const navigate = useNavigate();

    const [DataState, setState] = useState({
        status: "",
        message: "",
        data: "",
        isLoading: true,
    });

    useEffect(() => {
        axiosAuth(token)
            .get("v1/forms")
            .then((response) => {
                setState({ status: response.data.status, data: response.data.data, isLoading: false, message: response.data.status });
            })
            .catch((error) => {
                setState({ status: error.response.data.status, isLoading: false, message: error.response.data.status });
            });
    }, []);

    const { data, isLoading } = DataState;
    return (
        <>
            <Helmet>
                <title>FormApp</title>
            </Helmet>
            <section className='ml-52 py-8 px-10'>
                <div className='flex items-center gap-3'>
                    <h1 className='font-bold text-2xl'>All your form</h1>
                    <div className='w-[32px] h-[32px] text-lg font-bold bg-slate-200 flex justify-center items-center rounded-lg text-slate-500'>{data.length}</div>
                </div>
                <div className='grid grid-cols-4 gap-5 mt-8'>
                    {!isLoading ? data.map((item) => <Card key={item.id} id={item.id} name={item.name} slug={item.slug} desc={item.description} />) : null}
                    <div
                        className='flex flex-col justify-center items-center gap-2 py-12 shadow-xl bg-white border-2 border-slate-200 hover:border-sky-200 p-5 rounded-xl hover:shadow-sky-200 transition-all duration-300 cursor-pointer'
                        onClick={() => navigate("/create")}>
                        <Icon icon='line-md:document-add' width='46' className='text-sky-500' />
                        <p className='text-lg font-bold text-sky-500'>Buat Form Baru</p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
