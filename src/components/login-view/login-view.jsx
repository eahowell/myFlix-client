export const LoginView = () => {
  return (
    <form id="loginForm">
      <label id ="usernameLabel">
        Username:
        <input id ="usernameInput" type="text" />
      </label>
      <br />
      <br />
      <label id ="passwoordLabel">
        Password:
        <input id ="passwoordInput" type="password" />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};
