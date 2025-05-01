import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, FileText, Plus, Edit, Download, Activity, Heart, TreesIcon as Lungs, Brain, Pill } from "lucide-react"

export default function MedicalRecordsPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Medical Records</h1>
          <p className="text-gray-500">View and manage patient medical records</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
            <Download className="h-4 w-4 mr-2" /> Export Records
          </Button>
          <Button className="bg-blue-900 hover:bg-blue-800">
            <Plus className="h-4 w-4 mr-2" /> Create Record
          </Button>
        </div>
      </div>

      <Card className="p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search records by patient name, ID, or condition"
              className="pl-10 bg-white border-gray-200"
            />
          </div>
          <Button className="bg-blue-900 hover:bg-blue-800">Search</Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="p-6 lg:col-span-1">
          <h2 className="text-lg font-bold text-blue-900 mb-4">Patient Information</h2>
          <div className="flex flex-col items-center text-center mb-6">
            <Avatar className="h-20 w-20 mb-3">
              <AvatarFallback className="bg-blue-100 text-blue-900 text-xl">JD</AvatarFallback>
            </Avatar>
            <h3 className="font-bold text-blue-900">John Doe</h3>
            <p className="text-sm text-gray-500">P-10042389 • Male, 33 years</p>
            <div className="flex gap-2 mt-2">
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Hypertension</Badge>
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Asthma</Badge>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Contact Information</h3>
              <p className="text-blue-900">john.doe@example.com</p>
              <p className="text-blue-900">(555) 123-4567</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Emergency Contact</h3>
              <p className="text-blue-900">Jane Doe (Spouse)</p>
              <p className="text-blue-900">(555) 987-6543</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Primary Care Physician</h3>
              <p className="text-blue-900">Dr. Sarah Johnson</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Insurance</h3>
              <p className="text-blue-900">HealthPlus Insurance</p>
              <p className="text-blue-900">Policy #: HP-78923456</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start border-blue-900 text-blue-900 hover:bg-blue-50">
                <FileText className="h-4 w-4 mr-2" /> View Full History
              </Button>
              <Button variant="outline" className="w-full justify-start border-blue-900 text-blue-900 hover:bg-blue-50">
                <Edit className="h-4 w-4 mr-2" /> Edit Patient Info
              </Button>
              <Button variant="outline" className="w-full justify-start border-blue-900 text-blue-900 hover:bg-blue-50">
                <Pill className="h-4 w-4 mr-2" /> Manage Medications
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6 lg:col-span-3">
          <Tabs defaultValue="overview">
            <TabsList className="bg-white border border-gray-200 mb-6">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-900"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger value="vitals" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-900">
                Vitals
              </TabsTrigger>
              <TabsTrigger
                value="conditions"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-900"
              >
                Conditions
              </TabsTrigger>
              <TabsTrigger
                value="medications"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-900"
              >
                Medications
              </TabsTrigger>
              <TabsTrigger value="notes" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-900">
                Clinical Notes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-blue-900">Recent Vitals</h3>
                    <p className="text-sm text-gray-500">Last updated: May 5, 2023</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card className="p-4 bg-blue-50 border-blue-200">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Heart className="h-5 w-5 text-blue-900" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Blood Pressure</p>
                          <p className="text-xl font-bold text-blue-900">
                            120/80 <span className="text-sm font-normal">mmHg</span>
                          </p>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4 bg-blue-50 border-blue-200">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Activity className="h-5 w-5 text-blue-900" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Heart Rate</p>
                          <p className="text-xl font-bold text-blue-900">
                            72 <span className="text-sm font-normal">bpm</span>
                          </p>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4 bg-blue-50 border-blue-200">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Lungs className="h-5 w-5 text-blue-900" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Respiratory Rate</p>
                          <p className="text-xl font-bold text-blue-900">
                            16 <span className="text-sm font-normal">breaths/min</span>
                          </p>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4 bg-blue-50 border-blue-200">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Brain className="h-5 w-5 text-blue-900" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Temperature</p>
                          <p className="text-xl font-bold text-blue-900">
                            98.6 <span className="text-sm font-normal">°F</span>
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-blue-900 mb-4">Active Conditions</h3>
                  <div className="space-y-3">
                    <div className="p-4 border border-gray-200 rounded-md">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium text-blue-900">Hypertension</h4>
                          <p className="text-sm text-gray-500">Diagnosed: March 10, 2022</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Controlled</Badge>
                      </div>
                      <p className="text-sm text-gray-700 mt-2">
                        Essential hypertension, well-controlled with medication. Patient adhering to treatment plan.
                      </p>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-md">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium text-blue-900">Asthma</h4>
                          <p className="text-sm text-gray-500">Diagnosed: June 22, 2018</p>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Moderate</Badge>
                      </div>
                      <p className="text-sm text-gray-700 mt-2">
                        Moderate persistent asthma with occasional exacerbations. Maintenance therapy with inhaled
                        corticosteroids.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-blue-900 mb-4">Current Medications</h3>
                  <div className="space-y-3">
                    <div className="p-4 border border-gray-200 rounded-md">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium text-blue-900">Lisinopril</h4>
                          <p className="text-sm text-gray-600">10mg • Once daily • Morning with food</p>
                        </div>
                        <p className="text-sm text-gray-500">Prescribed: March 10, 2022</p>
                      </div>
                      <p className="text-sm text-gray-700 mt-2">
                        For hypertension management. Last refill: April 15, 2023. Refills remaining: 2.
                      </p>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-md">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium text-blue-900">Albuterol</h4>
                          <p className="text-sm text-gray-600">80mcg • As needed • 2 puffs</p>
                        </div>
                        <p className="text-sm text-gray-500">Prescribed: June 22, 2018</p>
                      </div>
                      <p className="text-sm text-gray-700 mt-2">
                        For asthma relief. Last refill: March 30, 2023. Refills remaining: 3.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-blue-900 mb-4">Recent Clinical Notes</h3>
                  <div className="space-y-3">
                    <div className="p-4 border border-gray-200 rounded-md">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-blue-900">Follow-up Visit</h4>
                        <p className="text-sm text-gray-500">May 5, 2023</p>
                      </div>
                      <p className="text-sm text-gray-500">Dr. Sarah Johnson • Cardiology</p>
                      <p className="text-sm text-gray-700 mt-2">
                        Patient reports feeling well. Blood pressure well-controlled on current medication. No side
                        effects reported. Advised to continue current treatment plan and maintain low-sodium diet.
                        Follow-up in 3 months.
                      </p>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-md">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-blue-900">Asthma Review</h4>
                        <p className="text-sm text-gray-500">April 20, 2023</p>
                      </div>
                      <p className="text-sm text-gray-500">Dr. Emily Rodriguez • Pulmonology</p>
                      <p className="text-sm text-gray-700 mt-2">
                        Patient reports one mild asthma attack in the past month, resolved with rescue inhaler. Lung
                        function tests show stable results. Continue current medication regimen. Recommended annual flu
                        vaccine before winter season.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="vitals">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-blue-900">Vitals History</h3>
                  <Button variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                    <Plus className="h-4 w-4 mr-2" /> Add New Reading
                  </Button>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-6 gap-4 p-4 border-b border-gray-200 bg-gray-50 font-medium text-gray-700">
                    <div className="col-span-1">Date</div>
                    <div className="col-span-1">Blood Pressure</div>
                    <div className="col-span-1">Heart Rate</div>
                    <div className="col-span-1">Resp. Rate</div>
                    <div className="col-span-1">Temperature</div>
                    <div className="col-span-1">Recorded By</div>
                  </div>

                  {[
                    {
                      date: "May 5, 2023",
                      bp: "120/80 mmHg",
                      hr: "72 bpm",
                      rr: "16 breaths/min",
                      temp: "98.6 °F",
                      provider: "Dr. Johnson",
                    },
                    {
                      date: "Apr 20, 2023",
                      bp: "118/78 mmHg",
                      hr: "70 bpm",
                      rr: "15 breaths/min",
                      temp: "98.4 °F",
                      provider: "Dr. Rodriguez",
                    },
                    {
                      date: "Mar 15, 2023",
                      bp: "122/82 mmHg",
                      hr: "74 bpm",
                      rr: "16 breaths/min",
                      temp: "98.8 °F",
                      provider: "Dr. Johnson",
                    },
                    {
                      date: "Feb 10, 2023",
                      bp: "124/84 mmHg",
                      hr: "76 bpm",
                      rr: "17 breaths/min",
                      temp: "99.0 °F",
                      provider: "Dr. Johnson",
                    },
                    {
                      date: "Jan 5, 2023",
                      bp: "126/86 mmHg",
                      hr: "78 bpm",
                      rr: "16 breaths/min",
                      temp: "98.6 °F",
                      provider: "Dr. Johnson",
                    },
                  ].map((reading, index) => (
                    <div
                      key={index}
                      className={`grid grid-cols-6 gap-4 p-4 items-center ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <div className="col-span-1 text-blue-900 font-medium">{reading.date}</div>
                      <div className="col-span-1 text-gray-700">{reading.bp}</div>
                      <div className="col-span-1 text-gray-700">{reading.hr}</div>
                      <div className="col-span-1 text-gray-700">{reading.rr}</div>
                      <div className="col-span-1 text-gray-700">{reading.temp}</div>
                      <div className="col-span-1 text-gray-700">{reading.provider}</div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="conditions">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-blue-900">Medical Conditions</h3>
                  <Button className="bg-blue-900 hover:bg-blue-800">
                    <Plus className="h-4 w-4 mr-2" /> Add Condition
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-md">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium text-blue-900">Hypertension</h4>
                        <p className="text-sm text-gray-500">Diagnosed: March 10, 2022</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Controlled</Badge>
                    </div>
                    <p className="text-sm text-gray-700 mt-2">
                      Essential hypertension, well-controlled with medication. Patient adhering to treatment plan.
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Treatment Notes</h5>
                      <p className="text-sm text-gray-700">
                        Currently managed with Lisinopril 10mg daily. Patient responds well to ACE inhibitor therapy.
                        Regular monitoring of kidney function and electrolytes. Patient educated on low-sodium diet and
                        regular exercise.
                      </p>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                        <Edit className="h-4 w-4 mr-1" /> Update
                      </Button>
                      <Button size="sm" variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                        <FileText className="h-4 w-4 mr-1" /> View History
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-md">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium text-blue-900">Asthma</h4>
                        <p className="text-sm text-gray-500">Diagnosed: June 22, 2018</p>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Moderate</Badge>
                    </div>
                    <p className="text-sm text-gray-700 mt-2">
                      Moderate persistent asthma with occasional exacerbations. Maintenance therapy with inhaled
                      corticosteroids.
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Treatment Notes</h5>
                      <p className="text-sm text-gray-700">
                        Maintenance therapy with inhaled corticosteroids. Albuterol as rescue medication. Patient
                        reports triggers include cold air, exercise, and pollen. Advised to use spacer with inhaler and
                        maintain clean home environment to reduce triggers.
                      </p>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                        <Edit className="h-4 w-4 mr-1" /> Update
                      </Button>
                      <Button size="sm" variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                        <FileText className="h-4 w-4 mr-1" /> View History
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-md">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium text-blue-900">Seasonal Allergies</h4>
                        <p className="text-sm text-gray-500">Diagnosed: April 15, 2019</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Mild</Badge>
                    </div>
                    <p className="text-sm text-gray-700 mt-2">
                      Seasonal allergic rhinitis, primarily in spring and fall. Responds well to over-the-counter
                      antihistamines.
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Treatment Notes</h5>
                      <p className="text-sm text-gray-700">
                        Patient manages symptoms with OTC loratadine as needed during allergy seasons. No prescription
                        medications required at this time. Advised to monitor for worsening symptoms that might indicate
                        need for prescription nasal steroids.
                      </p>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                        <Edit className="h-4 w-4 mr-1" /> Update
                      </Button>
                      <Button size="sm" variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                        <FileText className="h-4 w-4 mr-1" /> View History
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="medications">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-blue-900">Medications</h3>
                  <Button className="bg-blue-900 hover:bg-blue-800">
                    <Plus className="h-4 w-4 mr-2" /> Prescribe Medication
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-md">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium text-blue-900">Lisinopril</h4>
                        <p className="text-sm text-gray-600">10mg • Once daily • Morning with food</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div>
                        <p className="text-sm text-gray-500">Prescribed</p>
                        <p className="text-sm text-gray-700">March 10, 2022</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Last Refill</p>
                        <p className="text-sm text-gray-700">April 15, 2023</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Refills Remaining</p>
                        <p className="text-sm text-gray-700">2</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Notes</h5>
                      <p className="text-sm text-gray-700">
                        For hypertension management. Patient tolerating well with no reported side effects. Blood
                        pressure well-controlled on current dosage.
                      </p>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                        <Edit className="h-4 w-4 mr-1" /> Modify
                      </Button>
                      <Button size="sm" variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                        <FileText className="h-4 w-4 mr-1" /> Refill
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-md">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium text-blue-900">Albuterol</h4>
                        <p className="text-sm text-gray-600">80mcg • As needed • 2 puffs</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div>
                        <p className="text-sm text-gray-500">Prescribed</p>
                        <p className="text-sm text-gray-700">June 22, 2018</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Last Refill</p>
                        <p className="text-sm text-gray-700">March 30, 2023</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Refills Remaining</p>
                        <p className="text-sm text-gray-700">3</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Notes</h5>
                      <p className="text-sm text-gray-700">
                        For asthma relief. Patient instructed to use spacer for better delivery. Reports using
                        approximately 2-3 times per week, primarily before exercise.
                      </p>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                        <Edit className="h-4 w-4 mr-1" /> Modify
                      </Button>
                      <Button size="sm" variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                        <FileText className="h-4 w-4 mr-1" /> Refill
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-md border-dashed">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium text-gray-500">Loratadine</h4>
                        <p className="text-sm text-gray-500">10mg • As needed • Once daily</p>
                      </div>
                      <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">OTC</Badge>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Notes</h5>
                      <p className="text-sm text-gray-700">
                        Patient self-administers for seasonal allergies. Not a prescription medication. Included in
                        record for comprehensive medication tracking.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notes">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-blue-900">Clinical Notes</h3>
                  <Button className="bg-blue-900 hover:bg-blue-800">
                    <Plus className="h-4 w-4 mr-2" /> Add Note
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-md">
                    <div className="flex justify-between">
                      <h4 className="font-medium text-blue-900">Follow-up Visit</h4>
                      <p className="text-sm text-gray-500">May 5, 2023</p>
                    </div>
                    <p className="text-sm text-gray-500">Dr. Sarah Johnson • Cardiology</p>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Subjective</h5>
                      <p className="text-sm text-gray-700">
                        Patient reports feeling well overall. No chest pain, shortness of breath, or palpitations.
                        Continues to exercise 3 times per week. Following low-sodium diet as recommended. No medication
                        side effects reported.
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Objective</h5>
                      <p className="text-sm text-gray-700">
                        BP: 120/80 mmHg, HR: 72 bpm, RR: 16 breaths/min, Temp: 98.6°F Weight: 165 lbs (stable from last
                        visit) Heart: Regular rate and rhythm, no murmurs, gallops, or rubs Lungs: Clear to auscultation
                        bilaterally Extremities: No edema
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Assessment</h5>
                      <p className="text-sm text-gray-700">
                        1. Hypertension - Well-controlled on current medication 2. Asthma - Stable, no recent
                        exacerbations
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Plan</h5>
                      <p className="text-sm text-gray-700">
                        1. Continue Lisinopril 10mg daily 2. Continue current asthma management 3. Routine labs ordered:
                        CBC, CMP, Lipid Panel 4. Follow-up in 3 months 5. Call if any new symptoms develop
                      </p>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </Button>
                      <Button size="sm" variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                        <Download className="h-4 w-4 mr-1" /> Export
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-md">
                    <div className="flex justify-between">
                      <h4 className="font-medium text-blue-900">Asthma Review</h4>
                      <p className="text-sm text-gray-500">April 20, 2023</p>
                    </div>
                    <p className="text-sm text-gray-500">Dr. Emily Rodriguez • Pulmonology</p>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Subjective</h5>
                      <p className="text-sm text-gray-700">
                        Patient reports one mild asthma attack in the past month, resolved with rescue inhaler. Triggers
                        included exposure to cold air during outdoor running. No nighttime symptoms. Using rescue
                        inhaler approximately 2-3 times per week, primarily before exercise.
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Objective</h5>
                      <p className="text-sm text-gray-700">
                        Vitals: Within normal limits Lung examination: Clear to auscultation bilaterally, no wheezing
                        Peak flow: 450 L/min (90% of personal best) Spirometry: FEV1 85% of predicted, FVC 90% of
                        predicted
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Assessment</h5>
                      <p className="text-sm text-gray-700">
                        Moderate persistent asthma, currently well-controlled with occasional breakthrough symptoms
                        before exercise.
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Plan</h5>
                      <p className="text-sm text-gray-700">
                        1. Continue current medication regimen 2. Advised to use rescue inhaler 15-20 minutes before
                        exercise 3. Recommended annual flu vaccine before winter season 4. Follow-up in 6 months or
                        sooner if symptoms worsen
                      </p>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </Button>
                      <Button size="sm" variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                        <Download className="h-4 w-4 mr-1" /> Export
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}
