import { Form, Button } from "react-bootstrap";

const AddForm = () => {
    return(
        <Form>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Title *"
                    required />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Company Name *"
                    required />
            </Form.Group>
            {/* <Form.Group>
                <Form.Control
                    type="email"
                    placeholder="Email *"
                    required />
            </Form.Group> */}
            <Form.Group>
                <Form.Control
                    as="textarea"
                    placeholder="Description *"
                    rows={5}
                    required />
            </Form.Group>

            <Button variant="success" type="Save" block>
                Add New Experience
            </Button>
        </Form>
    )
}

export default AddForm;