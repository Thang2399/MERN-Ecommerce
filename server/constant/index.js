export const USER_ROLE = {
	ADMIN: 'admin',
	USER: 'user',
	SPONSOR: 'sponsor',
	SALESMAN: 'salesman'
};

export const HTTP_STATUS = {
	SUCCESS: 200,
	CREATE_SUCCESS: 201,

	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404
};

export const INVOICE_STATUS = {
	RECEIVED_ORDER: 'received order',
	CHECKING_IN_STOCK: 'checking in stock',
	PREPARING_ITEMS: 'preparing items',
	PACKAGED_ITEMS: 'packaged items',
	DELIVERING: 'delivering',
	DELIVERED_SUCCESS: 'delivered successfully',
	DELIVERED_FAIL: 'delivered failed',
};
