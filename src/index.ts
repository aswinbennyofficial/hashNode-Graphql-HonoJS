import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()
app.get('/', (c) => c.text('Hello Hono!'))

app.get('/hashnode/:id', async (c) => {
    const id=String(c.req.param("id"));
    const data = await fetch('https://gql.hashnode.com/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query : `{
                user(username: "${id}") {
                  id
                  username
                  name
                  bio
                  bioV2 {
                    markdown
                    html
                    text
                  }
                  profilePicture
                  coverPhoto
                  socialMediaLinks {
                    website
                    github
                    twitter
                    instagram
                    facebook
                    stackoverflow
                    linkedin
                    youtube
                  }
                }
              }
              `
        })
    });

    const result = await data.json();
    return c.json(result); 
    
});


serve(app)
