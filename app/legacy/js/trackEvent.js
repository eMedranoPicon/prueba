function trackEvent(link, id_attr1, id_attr2, id_cat) { 
	try { 		
		ga('send', 'event', id_cat, id_attr1, id_attr2);
	}catch(err){ 
		emptyAsd=err; 
	} 
	return;
} 