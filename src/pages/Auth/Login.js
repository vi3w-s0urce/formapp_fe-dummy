import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Loading from "../../components/Loading";
import LoginBanner from "../../assets/img/login.gif";
import { Icon } from "@iconify/react";
import { axiosBase } from "../../api/axiosConfig";
import { useAuth } from "../../context/AuthContext";
import { Helmet } from "react-helmet";

const Login = () => {
    const navigate = useNavigate();

    const { login, token } = useAuth();

    const [demoModalOpen, setdemoModalOpen] = useState(true);

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, []);

    const [LoginState, setState] = useState({
        email: "",
        password: "",
        status: "",
        message: "",
        error_message: "",
        token: "",
        data_user: "",
        isLoading: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        let email = e.target.email.value;
        let password = e.target.password.value;
        let status;
        let message;
        let error_message;
        let data_user;
        let token;

        setState({ isLoading: true });

        axiosBase
            .post("v1/auth/login", {
                email: email,
                password: password,
            })
            .then((response) => {
                status = response.data.status;
                data_user = JSON.stringify(response.data.data.user);
                token = "Bearer " + response.data.data.user.token;

                login(data_user, token);

                setState({ status: status, isLoading: false, token: token, data_user: data_user, message: response.data.message });

                setTimeout(() => {
                    navigate("/");
                }, 2000);
            })
            .catch((error) => {
                status = error.response.data.status;
                message = error.response.data.message;
                error_message = (
                    <div className='flex justify-center items-center gap-2 bg-red-100 p-2 rounded-lg border-2 border-red-400 text-red-400 font-bold'>
                        <Icon icon='line-md:alert-circle' color='#f87171' width='24' />
                        <span>{message}</span>
                    </div>
                );
                setState({ status: status, message: message, error_message: error_message, isLoading: false });
            });
    };

    return (
        <>
            <Helmet>
                <title>Login - FormApp</title>
            </Helmet>

            {demoModalOpen && (
                <div className='h-[100dvh] w-full flex z-[99999] top-0 left-0 justify-center items-center backdrop-blur-[3px] px-4 fixed' id='demo-modal'>
                    <div className='bg-white border-[#999999] border-2 rounded-[16px] p-6 w-fit max-w-[800px] flex flex-col xl:flex-row gap-6 shadow-2xl'>
                        <div className='flex flex-col w-full xl:items-start xl:w-[50%]'>
                            <div className='flex items-center gap-3'>
                                <h1 className='text-[46px]'>👋</h1>
                                <div className='flex flex-col'>
                                    <h1 className='font-mondwest text-[#333] text-2xl'>FormApp</h1>
                                    <a href='https://formapp.viewsource.work/' className='text-[#777] font-mondwest'>
                                        https://formapp.viewsource.work/
                                    </a>
                                </div>
                            </div>
                            <p className='text-[#333] text-xs font-hack font-bold mt-3 indent-4'>
                                Hello Visitor! Welcome to one of my dummy projects. Dummy project is a project that i made to train my skills or just for my school task. I’ve hosted it to provide a
                                preview for you and to showcase it in my portfolio. Enjoy!
                            </p>
                            <div className='flex gap-6 mt-6'>
                                <div className='flex flex-col gap-2'>
                                    <p className='text-[#333] text-base font-mondwest'>Made With</p>
                                    <div className='flex items-center gap-3'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width='24'
                                            height='24'
                                            viewBox='0 0 24 24'
                                            fill='none'
                                            stroke='currentColor'
                                            stroke-width='2'
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                            class='icon icon-tabler icons-tabler-outline icon-tabler-brand-react'>
                                            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                                            <path d='M6.306 8.711c-2.602 .723 -4.306 1.926 -4.306 3.289c0 2.21 4.477 4 10 4c.773 0 1.526 -.035 2.248 -.102' />
                                            <path d='M17.692 15.289c2.603 -.722 4.308 -1.926 4.308 -3.289c0 -2.21 -4.477 -4 -10 -4c-.773 0 -1.526 .035 -2.25 .102' />
                                            <path d='M6.305 15.287c-.676 2.615 -.485 4.693 .695 5.373c1.913 1.105 5.703 -1.877 8.464 -6.66c.387 -.67 .733 -1.339 1.036 -2' />
                                            <path d='M17.694 8.716c.677 -2.616 .487 -4.696 -.694 -5.376c-1.913 -1.105 -5.703 1.877 -8.464 6.66c-.387 .67 -.733 1.34 -1.037 2' />
                                            <path d='M12 5.424c-1.925 -1.892 -3.82 -2.766 -5 -2.084c-1.913 1.104 -1.226 5.877 1.536 10.66c.386 .67 .793 1.304 1.212 1.896' />
                                            <path d='M12 18.574c1.926 1.893 3.821 2.768 5 2.086c1.913 -1.104 1.226 -5.877 -1.536 -10.66c-.375 -.65 -.78 -1.283 -1.212 -1.897' />
                                            <path d='M11.5 12.866a1 1 0 1 0 1 -1.732a1 1 0 0 0 -1 1.732z' />
                                        </svg>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width='24'
                                            height='24'
                                            viewBox='0 0 24 24'
                                            fill='none'
                                            stroke='currentColor'
                                            stroke-width='2'
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                            className='icon icon-tabler icons-tabler-outline icon-tabler-brand-laravel'>
                                            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                                            <path d='M3 17l8 5l7 -4v-8l-4 -2.5l4 -2.5l4 2.5v4l-11 6.5l-4 -2.5v-7.5l-4 -2.5z' />
                                            <path d='M11 18v4' />
                                            <path d='M7 15.5l7 -4' />
                                            <path d='M14 7.5v4' />
                                            <path d='M14 11.5l4 2.5' />
                                            <path d='M11 13v-7.5l-4 -2.5l-4 2.5' />
                                            <path d='M7 8l4 -2.5' />
                                            <path d='M18 10l4 -2.5' />
                                        </svg>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width='24'
                                            height='24'
                                            viewBox='0 0 24 24'
                                            fill='none'
                                            stroke='currentColor'
                                            stroke-width='2'
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                            className='icon icon-tabler icons-tabler-outline icon-tabler-brand-tailwind'>
                                            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                                            <path d='M11.667 6c-2.49 0 -4.044 1.222 -4.667 3.667c.933 -1.223 2.023 -1.68 3.267 -1.375c.71 .174 1.217 .68 1.778 1.24c.916 .912 2 1.968 4.288 1.968c2.49 0 4.044 -1.222 4.667 -3.667c-.933 1.223 -2.023 1.68 -3.267 1.375c-.71 -.174 -1.217 -.68 -1.778 -1.24c-.916 -.912 -1.975 -1.968 -4.288 -1.968zm-4 6.5c-2.49 0 -4.044 1.222 -4.667 3.667c.933 -1.223 2.023 -1.68 3.267 -1.375c.71 .174 1.217 .68 1.778 1.24c.916 .912 1.975 1.968 4.288 1.968c2.49 0 4.044 -1.222 4.667 -3.667c-.933 1.223 -2.023 1.68 -3.267 1.375c-.71 -.174 -1.217 -.68 -1.778 -1.24c-.916 -.912 -1.975 -1.968 -4.288 -1.968z' />
                                        </svg>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <p className='text-[#333] text-base font-mondwest'>By viewsource</p>
                                    <div className='flex flex-col gap-3'>
                                        <a className='flex items-center gap-2 group cursor-pointer' href='https://github.com/vi3w-s0urce' target='_blank'>
                                            <svg
                                                stroke='currentColor'
                                                fill='currentColor'
                                                stroke-width='0'
                                                viewBox='0 0 24 24'
                                                className='text-[#333] text-[24px]'
                                                height='1em'
                                                width='1em'
                                                xmlns='http://www.w3.org/2000/svg'>
                                                <path d='M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z'></path>
                                            </svg>
                                            <p className='text-[#333] text-[10px] sm:text-xs font-hack group-hover:text-[#0000ff]'>github.com/vi3w-s0urce</p>
                                        </a>
                                        <a className='flex items-center gap-2 group cursor-pointer' href='https://linkedin.com/in/vi3w-s0urce' target='_blank'>
                                            <svg
                                                stroke='currentColor'
                                                fill='currentColor'
                                                stroke-width='0'
                                                viewBox='0 0 448 512'
                                                className='text-[#333] text-[24px]'
                                                height='1em'
                                                width='1em'
                                                xmlns='http://www.w3.org/2000/svg'>
                                                <path d='M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z'></path>
                                            </svg>
                                            <p className='text-[#333] text-[10px] sm:text-xs font-hack group-hover:text-[#0000ff]'>linkedin.com/in/vi3w-s0urce</p>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-full xl:w-[50%] flex flex-col gap-2'>
                            <p className='font-mondwest text-[#333] text-base'>How to use this website:</p>
                            <div className='py-3 px-4 flex flex-col gap-2 bg-[#e0e0e0]'>
                                <p className='text-xs font-hack'>
                                    You can login with one account first to create a form, then login with another account to fill out the form.
                                    <br />
                                    <br />
                                    User 1:
                                    <br />
                                    email: user1@example.com
                                    <br />
                                    password: password
                                    <br />
                                    <br />
                                    User 2:
                                    <br />
                                    email: user2@example.com
                                    <br />
                                    password: password
                                    <br />
                                    <br />
                                    User 3:
                                    <br />
                                    email: user3@gmail.com
                                    <br />
                                    password: password
                                </p>
                            </div>
                            <button
                                className='min-w-0 w-full h-fit px-6 py-3 text-white font-hack font-bold mt-1 rounded-none bg-[#00FF00] hover:bg-[#00aa00] text-base'
                                onClick={() => setdemoModalOpen(false)}>
                                ENJOY!
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Loading isLoading={LoginState.isLoading} status={LoginState.status} message={LoginState.message} />
            <section className='flex h-screen items-center justify-between transition-all duration-300'>
                <div className='w-full h-screen flex items-center justify-center'>
                    <div>
                        <h1 className='text-xl text-sky-400 font-bold mb-5'>FormApp.</h1>
                        <div className='mb-5'>
                            <h1 className='font-bold text-4xl mb-2'>Welcome!</h1>
                            <p className='text-slate-400'>Silahkan login terlebih dahulu untuk masuk ke FormApp.</p>
                        </div>
                        <form method='POST' onSubmit={handleSubmit}>
                            <div className='flex flex-col mb-4 gap-2'>
                                <label>Email</label>
                                <input
                                    type='email'
                                    placeholder='Masukkan Email'
                                    name='email'
                                    className='transition-all duration-300 border-2 p-2 rounded-lg focus:border-sky-400 focus:outline-none'
                                    required
                                />
                            </div>
                            <div className='flex flex-col mb-4 gap-2'>
                                <label>Password</label>
                                <input
                                    type='password'
                                    placeholder='Masukkan Password'
                                    name='password'
                                    className='transition-all duration-300 border-2 p-2 rounded-lg focus:border-sky-400 focus:outline-none'
                                    required
                                />
                            </div>
                            {LoginState.error_message}
                            <button type='submit' className='transition-all duration-300 bg-sky-400 text-white p-2 rounded-lg font-bold w-full mt-5 disabled:bg-slate-300 hover:bg-sky-500'>
                                Login
                            </button>
                        </form>
                    </div>
                </div>
                <div className='h-screen w-full bg-sky-200 flex items-center justify-center'>
                    <img src={LoginBanner} alt='LoginBanner' className='w-[500px]'></img>
                </div>
            </section>
        </>
    );
};

export default Login;
