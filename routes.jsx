class Routes extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { subscriptionType, subscriber, members, isOnboarding, getSubscribers, setSubscriber } = this.props;
		// TODO: main classname for barrings, onboarding & datapackage
		let mainClassName = isOnboarding ? 'pending' : subscriptionType;
		return (
			<Router basename="/mine-sider">
				<div className={'my-pages'}>
					<div className={mainClassName}>
						{!isOnboarding ? (
							<Header
								address={subscriber.address}
								subscription={subscriber.subscription}
								subscriptionType={subscriptionType}
								members={members}
								setSubscriber={setSubscriber}
							/>
						) : null}
						<div>
							<Switch>
								<Route exact path="/" render={() => <Redirect to={isOnboarding ? '/onboarding' : '/oversikt'} />} />
								<Route
									exact
									path="/onboarding"
									render={AsyncComponent(() => import('./Onboarding'))}
								/>
								<Route
									exact
									path="/datapakker"
									render={AsyncComponent(() => import('./Datapakke'))}
								/>
								<Route
									exact
									path="/sperrer"
									render={AsyncComponent(() => import('./Barrings'))}
								/>
								<Route
									exact
									path="/oversikt"
									render={AsyncComponent(() => import('./Overview'))}
								/>
								<Route
									path="/abonnement"
									render={AsyncComponent(() => import('./Subscription'))}
								/>
								<Route
									path="/faktura"
									render={props => <Invoices {...props} subscriber={subscriber} subscriptionType={subscriptionType} />}
								/>
								<Route
									path="/tjenester"
									render={props => <Services {...props} subscriber={subscriber} subscriptionType={subscriptionType} />}
								/>
								<Route path="/sim" render={props => <Sim {...props} subscriber={subscriber} subscriptionType={subscriptionType} />} />
								<Route path="/mobil" render={props => <Mobile {...props} subscriber={subscriber} />} />
								<Route component={NotFound} />
							</Switch>
						</div>
					</div>
				</div>
			</Router>
		);
	}
}
