import Header from "../../Components/Header";
import { Box } from "@mui/material";

const Dashboard = () => {
    return (
        <Box height="88vh" width="100%" display="flex" flexDirection="column" m={"0px"}>
            {/* HEADER */}
            <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
            <Box flex="1" display="flex" justifyContent="center" alignItems="center">
                <iframe 
                    title="ADMIN_DASHBOARD"
                    width="100%" 
                    height="100%"
                    src="https://app.powerbi.com/reportEmbed?reportId=01d80d1a-815a-46c6-8e8e-6390bf385b83&autoAuth=true&ctid=2800c0a0-70e9-49be-8733-faeaa6aced99&filterPaneEnabled=false&navContentPaneEnabled=false"
                    frameborder="0" 
                    allowFullScreen="true"
                    style={{ border: "none" }} // Remove iframe border
                >
                </iframe>
            </Box>
        </Box>
    )
}

export default Dashboard;
