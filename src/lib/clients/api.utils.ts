export async function post(endpoint: string, body: any): Promise<Response> {
    const res = await fetch(endpoint, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
                'Content-Type': 'application/json'
          }
    });

    return res
}