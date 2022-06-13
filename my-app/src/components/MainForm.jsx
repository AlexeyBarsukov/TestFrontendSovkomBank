import { useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { FioSuggestions } from "react-dadata";
import { useForm } from "react-hook-form";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import "react-dadata/dist/react-dadata.css";

function MainForm() {
  const token = "a9cb34d55c0ae6651c4aefe1495b0b20a41830f3";
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("+7");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const {
    register,
    formState: {
      errors,
    },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = data => {
    if (data) {
      reset()
      setShow(true)
    }
    else {
      setShow(false)

    }
  }

  const animatedComponents = makeAnimated();
  const options = [
    { value: 'VIP', label: 'VIP' },
    { value: 'Проблемные', label: 'Проблемные' },
    { value: 'ОМС', label: 'ОМС' },
    { value: 'ДМС', label: 'ДМС' },
  ]

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h3 style={{ fontFamily: 'Roboto', color: 'gray' }}> Заполните форму клиента поликлиники</h3>

            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" id="formBasicName">
                <Form.Label htmlFor="formBasicName">{errors?.firstName && <span style={{ color: 'red' }}>{errors?.firstName?.message || "Ошибка!"}</span> || "ФИО"}</Form.Label>
                <FioSuggestions
                  inputProps={{
                    name: 'firstName',
                    placeholder: 'Например, Иванов Иван Иванович',
                  }}
                  token={token}
                  value={fullName}
                  onChange={setFullName}
                />
              </Form.Group>

              <Form.Group className="mb-3" id="formBasicDate">
                <Form.Label htmlFor="formBasicDate">{errors?.date && <span style={{ color: 'red' }}>{errors?.date?.message || "Ошибка!"}</span> || "Дата рождения"}</Form.Label>
                <Form.Control type="Date"
                  {...register("date", {
                    required: "Выберите дату рождения",
                  })}
                />
              </Form.Group>

              <Form.Group className="mb-3" id="formBasicPhone" >
                <Form.Label htmlFor="formBasicPhone" required>{errors?.phone && <span style={{ color: 'red' }}>{errors?.phone?.message || "Ошибка!"}</span> || "Номер телефона"}</Form.Label>
                <Form.Control {...register("phone", {
                  pattern: { value: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/, message: 'Неверный формат' }, required: 'Введите номер правильно', minLength: {
                    value: 11,
                    message: 'Введите номер телефона'
                  },
                  maxLength: {
                    value: 12,
                    message: 'Кол-во цифр 11, не используя скобки(), тире (-) и пробелы'
                  }
                })} value={mobile} onChange={(e) => setMobile(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-3" id="formBasicSex">
                <Form.Label htmlFor="formBasicSex">{errors?.gender && <span style={{ color: 'red' }}>{errors?.gender?.message || "Ошибка!"}</span> || "Пол"}</Form.Label>
                <Form.Select defaultValue={''}{...register("gender", { required: 'Выберите ваш пол' })}>
                  <option value="" disabled >Выберите пол</option>
                  <option value="Мужской">Мужской</option>
                  <option value="Женский">Женский</option>
                  <option value="Другое">Другое</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" id="formBasicGroup">
                <Form.Label htmlFor="formBasicGroup">Группа клиентов</Form.Label>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  defaultValue={[options[2]]}
                  isMulti
                  options={options}
                />
              </Form.Group>

              <Form.Group className="mb-3" id="formBasicDoctor">
                <Form.Label htmlFor="formBasicSex">{errors?.doctor && <span style={{ color: 'red' }}>{errors?.doctor?.message || "Ошибка!"}</span> || "Лечащий врач"}</Form.Label>
                <Form.Select defaultValue={''} {...register("doctor", { required: 'Выберите врача' })}>
                  <option value="" disabled >Выберите врача</option>
                  <option value="Петров">Петров</option>
                  <option value="Захаров">Захаров</option>
                  <option value="Чергниговская">Черниговская</option>
                </Form.Select>
              </Form.Group>

              <Button variant="success" type="submit" >Отправить</Button>
            </Form>
            <Modal show={show} onHide={handleClose} >
              <Modal.Header closeButton>
                <Modal.Title>Новый клиент успешно создан</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <img src='https://emojitool.ru/img/whatsapp/2.21.23.23/woman-health-worker-3111.png' alt="doctor" />
                <Button variant="danger" onClick={handleClose}>Закрыть</Button>
              </Modal.Body>
            </Modal>
          </Col>
          <Col>
            <img src="https://k-vrachu.ru/design/common_new/img/slides/slide1.png" alt="mainDoctor" />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default MainForm;