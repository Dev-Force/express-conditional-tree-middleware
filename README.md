# Express Conditional Tree Middleware

Hi, this tool was made in order for me to be able to combine different and asynchronous middleware 
using different conditions but also combine those conditions with other middleware and other conditions.

I am dedicated to create scalable and easy to use tools, so this is one of them and I thought it would be nice if I could share it with you.


## TL;DR
Create a tree of middleware nodes that may either be middlewares or combination of middlewares


### Usage Example

```javascript
import { conditionalMiddleware, MiddlewareChainer, OrMiddlewareStrategy, AndMiddlewareStrategy } from 'express-conditional-tree-middleware';


class IPLimitMiddlewareNode {    

    applyMiddleware(app) {
        return (req, res, next) => {
            return new Promise((resolve, reject) => {
                if(app.get('myIPs').indexOf(req.ip) > -1) return resolve();
                else reject();
            });
        };
    }

}

class AdminMiddlewareNode {

    applyMiddleware(app) {
        return (req, res, next) => {
            return new Promise((resolve, reject) => {
                if(req.body.admin === true) return resolve();
                else reject();
            });
        };
    }

}

class TokenVerificationMiddlewareNode {

    applyMiddleware(app) {
        return (req, res, next) => {
            return new Promise((resolve, reject) => {
                if(token.verify()) return resolve();
                reject();
            });
        }
    }
    
}


let myRouter = express.Router();

// Create two new strategies
let orChainer = new MiddlewareChainer(new OrMiddlewareStrategy());
let andChainer = new MiddlewareChainer(new AndMiddlewareStrategy());

// Create the tree
andChainer.add(new TokenVerificationMiddlewareNode());
andChainer.add(new AdminMiddlewareNode());
orChainer.add(andChainer);
orChainer.add(new IPLimitMiddlewareNode());

//
//               Tree Structure
//
//                    And
//                   /   \
//                  /     \
//                 Or    IpLimit 
//               /    \
//              /      \
// TokenVerification   Admin
//

myRouter.use(
  conditionalMiddleware(app, myRouter, orChainer, function(res) {
      res.status(401).json({status: 'Unauthorized'});
  })
)
```


### Design Patterns Used

* Strategy
* Composition


### License

MIT
