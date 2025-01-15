import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import InputLabel from "@mui/material/InputLabel"
import FormControl from "@mui/material/FormControl"
import OutlinedInput from "@mui/material/OutlinedInput"
export default function FortgotPassword() {
  return (
    <div className="bg-tint-blue1 w-full h-screen flex justify-center items-center">
      <Card className="flex justify-center !bg-white !rounded-2xl w-4/5 md:w-auto">
        <CardContent className="m-7">
          <h2 className="font-bold text-base md:text-xl">
            Digite seu email para recuperação
          </h2>
          <form className="flex flex-col gap-4 my-5">
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-forgot-password">Email</InputLabel>
              <OutlinedInput
                className="!text-sm md:!text-base"
                id="outlined-forgot-password"
                type="email"
                label="Email"
              />
            </FormControl>
            <Button
              variant="contained"
              className="!bg-tint-blue1 hover:!bg-tint-blue2 !text-sm md:!text-base"
            >
              Recuperar senha
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
