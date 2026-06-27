

/*
   param: frontmatter from cache
   return: void
 */
export const fmTemplater = (frontmatter: any)=>{
	
	// pull values into vars
	const {
		created: oldCreated, 
		updated: oldUpdated
	} = frontmatter
	
	// iterate and delete keys
	for (const key of Object.keys(frontmatter)) {
		delete frontmatter[key]
	}
	
	frontmatter.created = oldCreated
	frontmatter.updated = oldUpdated
	frontmatter.aliases = []
	frontmatter.tags    = []
}