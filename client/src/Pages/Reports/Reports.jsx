import Header from "../../Components/Header";
import { Box } from "@mui/material";

const Reports = () => {
    return (
        <Box height="88vh" width="100%" display="flex" flexDirection="column" m={"0px"}>
            {/* HEADER */}
            <Header title="Reports" subtitle="Welcome to your Reports" />
            <Box flex="1" display="flex" justifyContent="center" alignItems="center">
                {/* <iframe title="USER_Reports"
                    width="100%"
                    height="100%"
                    src="https://app.powerbi.com/reportEmbed?reportId=85052aac-09d4-4968-8a0e-284481083f53&autoAuth=true&ctid=2800c0a0-70e9-49be-8733-faeaa6aced99&filterPaneEnabled=false&navContentPaneEnabled=false"
                    frameborder="0"
                    allowFullScreen="true"></iframe> */}
                    <img src="user_dashboard.png" alt="User Dashboard" />
            </Box>
        </Box>
    )
}

export default Reports;
