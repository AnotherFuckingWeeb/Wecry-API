import express, { Application } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { UserSignUpRoute } from './routes/usersignup.route'
import { LoginRoute } from './routes/login.route'
import { EditCompanyProfileRoute } from './routes/editcompany.route'
import { EditProfileRoute } from './routes/editprofile.route'
import { CompanySignUpRoute } from './routes/companysignup.route'
import { PostsRoute } from './routes/posts.route'
import { CreatePostRoute } from './routes/createpost.route'
import { HomeRoute } from './routes/home.route'
import { GetPostRoute } from './routes/post.route'
import { UserProfileRoute } from './routes/userprofile.route'
import { CompanyProfileRoute } from './routes/companyprofile.routes'
import { FeaturedStoresRoute } from './routes/featuredstores.route'
import { FeedbackRoute } from './routes/feedback.route'
import { ShoppingCartRoute } from './routes/shoppingcart.route'
import { CategoryStoresRoute } from './routes/categorystores.route'
import { PaymentRoute } from './routes/payment.route'

export class App {
    private app : Application;
    
    private routes = {
        home: new HomeRoute().router,
        login: new LoginRoute().router,
        userSignup: new UserSignUpRoute().router,
        companySignup: new CompanySignUpRoute().router,
        editProfile: new EditProfileRoute().router,
        editCompanyProfile: new EditCompanyProfileRoute().router,
        posts: new PostsRoute().router,
        createPost: new CreatePostRoute().router,
        getPost: new GetPostRoute().router ,
        userProfile: new UserProfileRoute().router,
        companyProfile: new CompanyProfileRoute().router,
        featuredStores: new FeaturedStoresRoute().router,
        feedback: new FeedbackRoute().router,
        shoppingCart: new ShoppingCartRoute().router,
        categoryStores: new CategoryStoresRoute().router,
        paymentRoute: new PaymentRoute().router
    }
    
    constructor (private port?: number | string) {
        this.app = express();
        this.Settings();
        this.Middlewares();
        this.Routes();
    }

    private Settings() : void {
        this.app.set('port', this.port || process.env.PORT || 4000 );
    }

    private Middlewares() : void {
        this.app.use(express.static('public'));
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());
    }

    private Routes() : void {
        this.app.use('/home', this.routes.home);
        this.app.use('/login', this.routes.login);
        this.app.use('/usersignup', this.routes.userSignup);
        this.app.use('/companysignup', this.routes.companySignup);
        this.app.use('/user', this.routes.editProfile);
        this.app.use('/editcompany', this.routes.editCompanyProfile);
        this.app.use('/posts', this.routes.posts);
        this.app.use('/createpost', this.routes.createPost);
        this.app.use('/post', this.routes.getPost);
        this.app.use('/userprofile', this.routes.userProfile);
        this.app.use('/companyprofile', this.routes.companyProfile);
        this.app.use('/featuredstores', this.routes.featuredStores);
        this.app.use('/feedback', this.routes.feedback);
        this.app.use('/shoppingcart', this.routes.shoppingCart);
        this.app.use('/stores', this.routes.categoryStores);
        this.app.use('/payment', this.routes.paymentRoute);
    }

    public async Listen() : Promise<void> {
        try {
            await this.app.listen(this.app.get('port'), () => {
                console.log(`listening on port: ${this.app.get('port')}`);
            });
        } catch (error) {
            console.log(error);
        }
    }
}