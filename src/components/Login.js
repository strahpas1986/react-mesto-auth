import { useState } from "react";

const Login = (props) => {
    const {onLogin} = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin({email, password});
    }

    return (
        <section className="root root__auth">
            <h2 className="root__title">Вход</h2>
            <form action="#" className="root__form" onSubmit={handleSubmit}>
                <div className="root__input-wrapper">
                <input
                    type="email"
                    className="root__input"
                    id="email"
                    placeholder="Email"
                    autoComplete="none"
                    onChange={(evt) => setEmail(evt.target.value)}
                />
                <input
                    type="password"
                    className="root__input"
                    id="password"
                    placeholder="Пароль"
                    autoComplete="none"
                    onChange={(evt) => setPassword(evt.target.value)}
                />
                </div>
                {/* <div className="root__input-wrapper">

                </div> */}
                <button className="root__submit" type="submit">Войти</button>
            </form>
        </section>
    )
}

export default Login;
