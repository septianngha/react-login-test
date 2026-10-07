function LoginForm({
  form,
  error,
  loading,
  onChange,
  onSubmit,
}) {
  return (
    <>
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="userServer">
            User Server
          </label>

          <input
            id="userServer"
            type="text"
            name="userServer"
            placeholder="Masukkan user server"
            value={form.userServer}
            onChange={onChange}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="userId">
            User ID
          </label>

          <input
            id="userId"
            type="text"
            name="userId"
            placeholder="Masukkan user ID"
            value={form.userId}
            onChange={onChange}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="userPassword">
            Password
          </label>

          <input
            id="userPassword"
            type="password"
            name="userPassword"
            placeholder="Masukkan password"
            value={form.userPassword}
            onChange={onChange}
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className="login-button"
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </>
  );
}

export default LoginForm;