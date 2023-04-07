import { useState } from "react";
import { Link } from "react-router-dom";

const Register = (props) => {
    const {onRegister} = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister({email, password});
    }

    return (
        <section className="root root__auth">
        <h2 className="root__title">Регистрация</h2>
        <form action="#" className="root__form" onSubmit={handleSubmit}>
            <div className="root__input-wrapper">
              <input
                  type="email"
                  className="root__input"
                  id="email"
                  placeholder="Email"
                  onChange={(evt) => setEmail(evt.target.value)}
              />
              <input
                  type="password"
                  className="root__input"
                  id="password"
                  placeholder="Пароль"
                  onChange={(evt) => setPassword(evt.target.value)}
              />
            </div>
            <button className="root__submit">Зарегистрироваться</button>
        </form>
        <Link className="root__signed-up" to="/sign-in">
            Уже зарегистрированы? Войти
        </Link>
        </section>
    )
}

export default Register;
