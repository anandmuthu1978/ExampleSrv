/*eslint no-console: 0, no-unused-vars: 0, no-shadow: 0, new-cap: 0*/
"use strict"

module.exports = (app) => {

	/**
	 * @swagger
	 *
	 * /rest/auth/isFinance:
	 *   get:
	 *     summary: Check if user has Finance roles
	 *     tags:
	 *       - Select data
	 *     responses:
	 *       '200':
	 *         description: Output
	*     parameters:
	 *       - name: field
	 *         in: path
	 *         description: columns
	 *         required: false
	 *         schema:
	 *           type: string   
	 */	
		app.get("/rest/auth/isFinance", async(req, res) => {	
		try {

			console.log(req._.req.authInfo)
			console.log(req.authInfo)
			if (req._.user.is("FINANCE")) 
			{
				return res.type("application/json").status(200).send({"approver": "true"})
			}else
			{
				return res.type("application/json").status(200).send({"approver": "false"})
			}
			
		} catch (e) {
			return res.type("text/plain").status(500).send(`ERROR: ${e.toString()}`)
		}

	})
	return app
}
