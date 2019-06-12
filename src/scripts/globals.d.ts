interface ComponentDefinition {
	name: string
	place?: keyof HTMLElementTagNameMap | HTMLElement
	data?: any
}

interface Window {
	initComponents: ComponentInitializer
	initAdminComponents: ComponentInitializer
}
