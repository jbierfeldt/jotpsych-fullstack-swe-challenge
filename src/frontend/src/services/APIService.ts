class APIService {
  private static instance: APIService;
  private baseUrl: string;
  private appVersion: string;

  private constructor() {
    this.baseUrl = "http://localhost:3002";
    this.appVersion = "1.0.0";
  }

  public static getInstance(): APIService {
    if (!APIService.instance) {
      APIService.instance = new APIService();
    }
    return APIService.instance;
  }

  public async request(
    endpoint: string,
    method: string,
    body?: any,
    auth: boolean = false,
    isJson: boolean = true
  ): Promise<any> {
    const headers: HeadersInit = {
      "app-version": this.appVersion,
    };

    if (auth) {
      const token = localStorage.getItem('token');
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    if (isJson) {
      headers["Content-Type"] = "application/json";
      body = body ? JSON.stringify(body) : null;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method,
      headers,
      body: body ? body : null,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  }
}

const instance = APIService.getInstance();
export default instance;
