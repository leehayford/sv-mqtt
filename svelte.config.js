
/* PROD ***************************************************/
// import adapter from '@sveltejs/adapter-node'; 
// // npm install @sveltejs/adapter-node
/* PROD *** END *******************************************/


/* DEV ****************************************************/
import adapter from '@sveltejs/adapter-auto'; 
/* DEV *** END ********************************************/

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	}
};

export default config;

