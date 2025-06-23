const APIProxy = {
  async request(url, options = {}) {
    const token = localStorage.getItem("token");

    const headers = {};
    if (options.body) {
      headers["Content-Type"] = "application/json";
    }

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    if (options.headers) {
      for (const key in options.headers) {
        headers[key] = options.headers[key];
      }
    }

    const finalOptions = {};
    for (const key in options) {
      finalOptions[key] = options[key];
    }

    finalOptions.headers = headers;

    try {
      const res = await fetch(url, finalOptions);
      if (!res.ok) {
        let errorBody;
        try {
          errorBody = await res.json();
        } catch {
          errorBody = { error: "Unknown error" };
        }

        if (res.status === 401) {
          console.warn("Токен недійсний або прострочений");
          localStorage.removeItem("token");
          window.location.href = "/login";
        }

        throw new Error(errorBody.error || "Unknown error");
      }

      return await res.json();
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  },

  get: function (url) {
    return this.request(url, { method: "GET" });
  },

  post: function (url, body) {
    return this.request(url, {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  patch: function (url, body) {
    return this.request(url, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  },
  delete: function (url) {
    return this.request(url, {
      method: "DELETE",
    });
  },
};

export { APIProxy };
