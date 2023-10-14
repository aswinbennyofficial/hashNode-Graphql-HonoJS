import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()
app.get('/', (c) => c.text('Hello Hono!'))

app.get('/hashnode', async (c) => {
    const data = await fetch('https://gql.hashnode.com/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query : `{
                publication(host: "aswinbenny.hashnode.dev") {
                    seriesList(first: 0) {
                        totalDocuments
                    }
                }
            }`
        })
    });

    const result = await data.json();
    return c.json(result); 
    
});


serve(app)
